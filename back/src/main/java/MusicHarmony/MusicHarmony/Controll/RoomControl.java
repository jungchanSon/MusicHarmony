package MusicHarmony.MusicHarmony.Controll;

import MusicHarmony.MusicHarmony.Repo.RoomRepoImpl;
import MusicHarmony.MusicHarmony.Service.RoomService;
import MusicHarmony.MusicHarmony.VO.Room;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class RoomControl {
    private final RoomRepoImpl roomRepo;
    private final RoomService roomService;

    String local= "localhost";
    String server = "";

    @PostMapping("/roomCreate")
    @ResponseBody
    public void createRoom(@RequestParam String name) {
        System.out.println("createRoom");
        roomService.createRoom(name);
    }

    @GetMapping("/getRooms")
    @ResponseBody
    public List<Room> getRooms(){
        return roomService.getRooms();
    }

}
