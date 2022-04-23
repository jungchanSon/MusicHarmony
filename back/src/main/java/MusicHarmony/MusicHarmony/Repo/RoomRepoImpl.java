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
        roomRepo.put(room.getRoomID(), room);
        return room;
    }
}
