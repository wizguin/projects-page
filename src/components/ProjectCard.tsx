interface Props {
    title: string,
    description: string,
    badges?: string[],
}

export default function ProjectCard({ title, description, badges = [] }: Props) {
    return (
        <section className="container px-4 pb-4">
            <div className="card">
                <div className="row g-0">

                    <div className="col-md-8">
                        <div className="card-body m-4">
                            <h5 className="card-title">{title}</h5>

                            <div className="my-2">
                                {
                                    badges.map((text) => (
                                        <span className="badge text-bg-secondary me-1">{text}</span>
                                    ))
                                }
                            </div>

                            <p className="card-text">
                                {description}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
