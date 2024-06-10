import './Section.css'

import Card from './card/Card'
import { Props as CardProps } from './card/Card'

export interface Props {
    title: string,
    cards: CardProps[]
}

export default function Section({ title, cards }: Props) {
    const cardComponents = cards.map((card, index) => (
        <Card key={index} {...card} />
    ))

    return (
        <section className='cards'>
            <h2>{title}</h2>
            {cardComponents}
        </section>
    )
}
