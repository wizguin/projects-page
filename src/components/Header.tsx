import './Header.css'

interface Props {
    headerTitle: string,
    projectsTitle?: string,
    githubUrl?: string
}

export default function Header({ headerTitle, projectsTitle = 'Projects', githubUrl = 'github' }: Props) {
    return (
        <>
            <header>
                <div className='header-title'>
                    <h1>{headerTitle}</h1>

                    <a href={githubUrl}>
                        <i className='fa-brands fa-github'></i>
                    </a>
                </div>

                <h2>{projectsTitle}</h2>
            </header>

            <div className='header-gradient'></div>
        </>
    )
}
