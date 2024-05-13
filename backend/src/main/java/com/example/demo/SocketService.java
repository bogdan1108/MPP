package com.example.demo;

import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.annotation.OnConnect;
import com.corundumstudio.socketio.annotation.OnDisconnect;
import com.corundumstudio.socketio.annotation.OnEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SocketService {

    @Autowired
    private SocketIOServer server;

    @OnConnect
    public void onConnect(SocketIOClient client) {
        System.out.println("Client connected: " + client.getSessionId());
    }

    @OnDisconnect
    public void onDisconnect(SocketIOClient client) {
        System.out.println("Client disconnected: " + client.getSessionId());
    }

    @OnEvent("createVolunteer")
    public void onCreateVolunteer(SocketIOClient client, AckRequest ackRequest, Volunteer volunteer) {
        // Here you can handle the creation of a volunteer and broadcast it to all
        // clients
        System.out.println("Volunteer created: " + volunteer);
        server.getBroadcastOperations().sendEvent("volunteerCreated", volunteer);
    }

    // Define the method to broadcast the creation of a volunteer
    public void broadcastVolunteerCreated(Volunteer volunteer) {
        // Convert the Volunteer object to JSON or another suitable format
        // For simplicity, we're just sending the object directly. In a real
        // application, you might need to serialize it.
        server.getBroadcastOperations().sendEvent("volunteerCreated", volunteer);
    }
}
