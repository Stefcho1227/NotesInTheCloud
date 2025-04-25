package org.example.notesproject.service;

import org.example.notesproject.models.Reminder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private JavaMailSender sender;
    @Autowired
    public MailService(JavaMailSender sender) {
        this.sender = sender;
    }
    public void sendReminder(Reminder r) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(r.getCreator().getEmail());
        msg.setSubject("💡 Reminder due: " + r.getTodoItem().getText());
        msg.setText("""
                Hi %s,

                Your todo "%s" was due at %s.
                """.formatted(
                r.getCreator().getUsername(),
                r.getTodoItem().getText(),
                r.getRemindAt())
        );
        sender.send(msg);
    }
}
