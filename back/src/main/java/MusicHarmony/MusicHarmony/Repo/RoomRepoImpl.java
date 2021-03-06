package MusicHarmony.MusicHarmony.Repo;

import MusicHarmony.MusicHarmony.VO.Room;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Repository
public class RoomRepoImpl implements RoomRepo{
    private static Map<String, Room> roomRepo = new LinkedHashMap<>();

    @Override
    public List<Room> fineAllRoom() {
        List roomList = new ArrayList(roomRepo.values());

        return roomList;
    }

    @Override
    public Room findRoom(String id) {

        return roomRepo.get(id);
    }

    @Override
    public Room createRoom(String name) {
        Room room = Room.create(name);
        roomRepo.put(room.getRoomId(), room);
        return room;
    }

    @Override
    public void removeRoom(String id) {
        roomRepo.remove(id);
    }

    @Override
    public List getRoomUsers(String roomId) {
        return roomRepo.get(roomId).getUserList();
    }

    @Override
    public void addUser(String roomId, String userName) {
        System.out.println(roomRepo.values());
        System.out.println(roomRepo.keySet());
        System.out.println(roomId);
        Room room =roomRepo.get(roomId);
        room.addUser(userName);
        System.out.println(room);
    }

    @Override
    public void removeUser(String roomId, String userName) {
        roomRepo.get(roomId).removeUser(userName);
    }

}
