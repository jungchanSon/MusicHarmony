package MusicHarmony.MusicHarmony.VO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class Room {
    private String roomID;
    private String name;

    public static Room create(String name){
        Room room = new Room();
        room.roomID = UUID.randomUUID().toString();
        room.name = name;
        return room;
    }
}
