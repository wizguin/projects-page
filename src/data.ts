import { Props as Project } from './components/ProjectCard'
import PreviewTypes from './components/types/PreviewTypes'

interface Data {
    headerTitle: string,
    projects: Project[]
}

const data:Data = {
    headerTitle: 'Portfolio',
    projects: [
        {
            title: 'Project',
            description: `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            `,
            badges: ['Node.js', 'React'],
            demoUrl: 'demo',
            sourceUrl: 'source',
            previewType: PreviewTypes.Image,
            previewFile: 'preview.jpg'
        }
    ]
}

export default data
