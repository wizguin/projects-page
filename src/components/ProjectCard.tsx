import PreviewTypes from './types/PreviewTypes'

interface Props {
    title: string,
    description: string,
    badges?: string[],
    demoUrl?: string,
    sourceUrl?: string,
    previewType?: PreviewTypes
    previewFile: string
}

const previewDir = 'assets/previews/'

export default function ProjectCard({ title, description, badges = [], demoUrl, sourceUrl, previewType = PreviewTypes.Image, previewFile }: Props) {
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
                                        <span key={text} className="badge text-bg-secondary me-1">{text}</span>
                                    ))
                                }
                            </div>

                            <p className="card-text">
                                {description}
                            </p>

                            { demoUrl && <a className="btn btn-primary me-1" href={demoUrl} role="button">Demo</a> }
                            { sourceUrl && <a className="btn btn-secondary me-1" href={sourceUrl} role="button">Source Code</a> }

                        </div>
                    </div>

                    <div className="d-none d-md-block col-md align-self-center">
                        { getPreview(previewType, previewFile) }
                    </div>

                </div>
            </div>
        </section>
    )
}

function getPreview(previewType: PreviewTypes, previewFile: string) {
    const src = `${previewDir}${previewFile}`
    const className = "preview-content img-fluid object-fit-cover rounded p-1"

    switch (previewType) {
        case PreviewTypes.Image:
            return <img src={src} className={className} />

        case PreviewTypes.Video:
            return <video controls className={className}><source src={src}></source></video>
    }
}
