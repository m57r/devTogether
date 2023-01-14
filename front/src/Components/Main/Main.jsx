import './Main.scss';
import { Link } from 'react-router-dom'; 
import user from './user.png'; 
import project from './project.png'; 

function Main() {
    return (
        <main className='main'>
            <div className='main_project-owner'>

                <div className='main_project-owner_triangle'></div>
                <div className='main_project-owner_triangle2'></div>

                <div className='main_project-owner_content'>
                    <div className='main_project-owner_content--left'>
                        <div className='paragraph'>
                            <h2 className='paragraph_title'>Vous avez des projets plein la tête ? </h2>
                            <p className='paragraph_text'>Vous cherchez des développeurs pour les mener à bien ? </p>
                        </div>

                        <h2 className='paragraph_title'>Vous êtes au bon endroit ! </h2>
                        <p className='paragraph paragraph_text'>Chez <span>Dev’ together</span>, de nombreux développeurs sont à la recherche de nouveaux projets.</p>

                        <div className='main_project-owner_buttons-container'>
                            <button>Déposer un projet</button>
                            <Link to='#' className='link'>Ou rechercher <br /> un développeur</Link>
                        </div>
                    </div>
                    

                    <div className='main_project-owner_content--right'>
                        <img src={user} alt='user'/>
                        <h3 className ='main_project-owner_content--right_name'> Ralph Edwards</h3>
                        <p className='main_project-owner_content--right_role'> Chef de projet Universe</p>
                        <p className='paragraph paragraph_text main_project-owner_content--right_text'>Je cherchais des développeurs pour mener à bien mon projet. J’ai trouvé l’équipe idéale. Aujourd’hui je peux dire que Universe existe grâce à eux. </p>
                    </div>
                </div>
            </div>

            <div className='main_developer'>
                <div className='main_developer_triangle'></div>

                <div className='main_developer_content'>

                    <div className='main_developer_content--left'>
                        <div className='paragraph'>
                            <h2 className='paragraph_title'>Vous êtes développeur ?</h2>
                            <p className='paragraph_text'>Vous aimeriez travailler en équipe sur divers projets ?</p>
                        </div>

                        <p className='paragraph paragraph_text'>Quels que soient votre niveau et vos spécialités, <span>nous sommes sûrs que vous trouverez le projet qui vous convient !</span></p>
                        <p className='paragraph paragraph_text'>Alors n’attendez-plus et positionner vous sur les projets de vos choix !</p>

                        <div className='main_project-owner_buttons-container'>
                            <button>Voir les projets</button>
                        </div>
                    </div>

                    <div className='main_developer_content--right'>
                        <img src={project} alt='project'/>
                        <h3 className ='main_developer_content_title-project'> Projet Universe</h3>
                    </div>
                
                </div>
            </div>

        </main>
    )
}


export default Main;