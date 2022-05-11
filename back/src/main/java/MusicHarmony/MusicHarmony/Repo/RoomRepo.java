package MusicHarmony.MusicHarmony.Repo;

import MusicHarmony.MusicHarmony.VO.Room;

import java.util.List;

public interface RoomRepo {

    List<Room> fineAllRoom();
    Room findRoom(String id);
    Room createRoom(String name);
    void removeRoom(String id);

    List getRoomUsers(String roomId);

    void addUser(String roomId, String userName);
    void removeUser(String roomId, String userName);
}