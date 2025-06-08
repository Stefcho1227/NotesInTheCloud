package org.example.notesproject.scheduler;

import jakarta.transaction.Transactional;
import org.example.notesproject.enums.Channel;
import org.example.notesproject.models.Notification;
import org.example.notesproject.models.Reminder;
import org.example.notesproject.repository.NotificationRepository;
import org.example.notesproject.repository.ReminderRepository;
import org.example.notesproject.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@EnableScheduling
public class ReminderScheduler {
    private final ReminderRepository reminderRepository;
    private final NotificationRepository notificationRepository;
    private final MailService mailService;
    @Autowired
    public ReminderScheduler(ReminderRepository reminderRepository, NotificationRepository notificationRepository,
                             MailService mailService) {
        this.reminderRepository = reminderRepository;
        this.notificationRepository = notificationRepository;
        this.mailService = mailService;
    }
    @Scheduled(fixedRate = 60_000)
    @Transactional
    public void dispatchDue() {
        List<Reminder> reminders = reminderRepository
                .findAll();
        reminders.stream()
                .filter(r -> r.getRemindAt().isBefore(LocalDateTime.now()))
                .filter(r -> !r.getTodoItem().getDone())
                .forEach(this::handleDueReminder);
    }
    private void handleDueReminder(Reminder r) {
        mailService.sendReminder(r);
        Notification n = new Notification();
        n.setUser(r.getCreator());
        n.setReminder(r);
        n.setSentAt(LocalDateTime.now());
        notificationRepository.save(n);
        r.setSent(true);
    }
}
