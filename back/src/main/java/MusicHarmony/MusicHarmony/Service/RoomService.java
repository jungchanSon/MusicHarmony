package MusicHarmony.MusicHarmony.Service;

import MusicHarmony.MusicHarmony.Repo.RoomRepoImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepoImpl roomRepo;

    public void createRoom(String name){
        roomRepo.createRoom(name);
    }
}
