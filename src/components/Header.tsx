interface Props {
    headerTitle: string,
    projectsTitle?: string,
    githubUrl?: string
}

export default function Header({ headerTitle, projectsTitle = 'Projects', githubUrl = 'github' }: Props) {
    return (
        <>
            <header className='banner p-4 text-center'>
                <div className='container py-4'>
                    <h1 className='pb-4'>{headerTitle}</h1>

                    <a className='btn' href={githubUrl}>
                        <i className='fa-brands fa-github h1 mb-0'></i>
                    </a>
                </div>
            </header>

            <section className='container p-4 text-center'>
                <h4 className='mb-0'>{projectsTitle}</h4>
            </section>
        </>
    )
}
