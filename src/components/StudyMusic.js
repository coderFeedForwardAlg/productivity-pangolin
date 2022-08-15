import audioML1 from './sound/output.wav';
import audioDing from './sound/mixkit-attention-bell-ding-586.wav';

const StudyMusic = () => {
    const ding = new Audio(audioDing);
    const ML1 = new Audio(audioML1);
    ML1.loop = true; 
    ding.loop = true; 

    let playingMusic = false; 
    const music1 = () => {
        if(playingMusic){
            ding.pause(); 
        }else {
            playingMusic = true; 
            ding.play();
        }
    }
    return (
        <div className="study_music">
            <button className='musicButton' onClick={music1}>
                play ding
            </button>
        </div>
    );
}
 
export default StudyMusic;