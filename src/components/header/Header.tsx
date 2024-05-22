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

                    <a href={githubUrl}>
                        <i className='fa-brands fa-github'></i>
                    </a>
                </div>
            </header>

            <div className='header-gradient'></div>
        </>
    )
}
