package org.example.notesproject.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.example.notesproject.models.Note;
import org.example.notesproject.models.Reminder;
import org.example.notesproject.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

@Service
public class MailService {
    public static final String URL = "http://localhost:8080/api/shares/confirm/";

    private final JavaMailSender sender;
    @Autowired
    public MailService(JavaMailSender sender) {
        this.sender = sender;
    }
    public void sendReminder(Reminder r) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(r.getCreator().getEmail());
        msg.setSubject("💡 Reminder due: " + r.getTodoItem().getText());
        msg.setText("""
                Hi %s,

                Your todo "%s" was due at %s.
                """.formatted(
                r.getCreator().getUsername(),
                r.getTodoItem().getText(),
                r.getRemindAt().format(formatter))

        );
        sender.send(msg);
    }

    public void sendMailForShare(User target, String token, Note note, User mailSender){
        String link = URL + token;
        try {
            MimeMessage mail = sender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mail, "UTF-8");
            helper.setTo(target.getEmail());
            helper.setSubject(mailSender.getUsername() + " shared a note with you");
            String html = """
            <p>%s wants to share a note titled "<strong>%s</strong>".</p>
                    <p>Click <a href="%s" style="color: #1a73e8; text-decoration: underline;">here to accept</a>.</p>
                    """.formatted(mailSender.getUsername(), note.getTitle(), link);
            helper.setText(html, true);
            sender.send(mail);
        } catch (MailException | MessagingException e){
            throw new IllegalArgumentException("Failed to send email");
        }
    }
}

