import './Header.css'

interface Props {
    headerTitle: string,
    githubUrl?: string
}

export default function Header({ headerTitle, githubUrl = 'github' }: Props) {
    return (
        <>
            <header>
                <div className='header-title'>
                    <h1>{headerTitle}</h1>

                    <div className='header-links'>

                        <a className='header-link' href={githubUrl}>
                            <i className='fa-brands fa-github'></i>
                            <span className='tooltip fade'>GitHub</span>
                        </a>

                    </div>
                </div>
            </header>

            <div className='header-gradient'></div>
        </>
    )
}
