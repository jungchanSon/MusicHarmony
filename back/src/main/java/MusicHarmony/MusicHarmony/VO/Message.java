package MusicHarmony.MusicHarmony.VO;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Message {

    public String roomID;
    public String userName;
    public String message;
    public Object description;
    public TYPE type;

}
enum TYPE {
    ENTER, QUIT, MESSAGE, OFFER
}