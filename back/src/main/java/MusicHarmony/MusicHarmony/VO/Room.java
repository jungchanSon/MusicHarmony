package MusicHarmony.MusicHarmony.VO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.Nullable;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class Room {
    private String roomID;
    private String name;
    @Nullable private List userList = new ArrayList();


    public void addUser(String userName) {
        userList.add(userName);
    }
    public void removeUser(String userName){
        userList.remove(userName);
    }

    public static Room create(String name){
        Room room = new Room();
        room.roomID = UUID.randomUUID().toString();
        room.name = name;
        return room;
    }
}
