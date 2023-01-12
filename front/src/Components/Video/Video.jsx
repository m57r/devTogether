import video from './video.mp4'

function Video(){
    return(
        <div className='video_container'>
            <video src={video} autoPlay loop muted controls/>  
            <h1 className= 'video_title'>trouvez l'équipe idéale <br/> avec <span>dev' together</span></h1> 
        </div> 
    )
}

export default Video;