interface Props {
    title: string,
    description: string
}

export default function ProjectCard({ title, description }: Props) {
    return (
        <section className="container px-4 pb-4">
            <div className="card">
                <div className="row g-0">

                    <div className="col-md-8">
                        <div className="card-body m-4">
                            <h5 className="card-title">{title}</h5>

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
