package MusicHarmony.MusicHarmony.Controll;

import MusicHarmony.MusicHarmony.Repo.RoomRepoImpl;
import MusicHarmony.MusicHarmony.Service.RoomService;
import MusicHarmony.MusicHarmony.VO.Room;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@Controller
@RequiredArgsConstructor
public class RoomControl {
    private final RoomRepoImpl roomRepo;
    private final RoomService roomService;

    String localUrl= "localhost";
    String server = "";

    //방만들기
    @PostMapping("/createRoom")
    @ResponseBody
    public void createRoom(@RequestParam String name) {
        System.out.println(name);
        roomRepo.createRoom(name);
    }

    //모든 방 조회
    @GetMapping("/getRooms")
    @ResponseBody
    public List<Room> getRooms(){
        return roomService.getRooms();
    }

    //방 들어가기
    @GetMapping("/enterRoom/{roomID}")
    @ResponseBody
    public String roomEnter(Model model, @PathVariable String roomID){
        System.out.println("enterRoom" + roomID);

        return "Ok";
    }

//    @PostMapping("/create")
//    @ResponseBody
//    public Room createRoom(@RequestBody Map<String,String> name) {
//        System.out.println(name.get("name"));
//        return roomService.createRoom(name.get("name"));
//    }
}
