import { Props as SectionProps } from './components/section/Section'

interface Data {
    sections: SectionProps[]
}

const data: Data = {
    sections: [
        {
            title: 'Projects',
            cards: [
                {
                    title: 'Project',
                    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
                    badges: ['Node.js', 'React'],
                    demoUrl: 'demo',
                    sourceUrl: 'source',
                    media: [
                        'sample_image.jpg',
                        'sample_video.mp4'
                    ]
                },
                {
                    title: 'Project',
                    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
                    badges: ['Node.js', 'React'],
                    demoUrl: 'demo',
                    sourceUrl: 'source',
                    media: [
                        'sample_video2.mp4',
                        'sample_video3.mp4'
                    ]
                }
            ]
        }
    ]
}

export default data
