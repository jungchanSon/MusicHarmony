package MusicHarmony.MusicHarmony.Service;

import MusicHarmony.MusicHarmony.Repo.RoomRepoImpl;
import MusicHarmony.MusicHarmony.VO.Room;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepoImpl roomRepo;

    public Room createRoom(String name){
        Room room = roomRepo.createRoom(name);
        return room;
    }

    public List<Room> getRooms() {
        return roomRepo.fineAllRoom();
    }
}
