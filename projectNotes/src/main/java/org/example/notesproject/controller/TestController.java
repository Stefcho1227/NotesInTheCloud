package org.example.notesproject.controller;

import org.example.notesproject.models.Reminder;
import org.example.notesproject.repository.ReminderRepository;
import org.example.notesproject.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/test")
@RestController
public class TestController {

    private final MailService mailService;
    private final ReminderRepository reminderRepository;

    @Autowired
    public TestController(MailService mailService, ReminderRepository reminderRepository) {
        this.mailService = mailService;
        this.reminderRepository = reminderRepository;
    }


    @GetMapping("/mail/{id}")
    public String testMail(@PathVariable Integer id) {
        Reminder reminder = reminderRepository.findById(id).orElseThrow();
        mailService.sendReminder(reminder);
        return "Email sent!";
    }
}
