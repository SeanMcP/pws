import React from 'react'
import { buildRoute } from 'constants/routes'
import { useItems } from 'store/useItems'
import AppLink from 'components/AppLink/AppLink'
import Button from 'components/Button/Button'
import IconHeading from 'components/IconHeading/IconHeading'

import './RecommendationsList.scss'

function RecommendationsList({ icon, ids, title }) {
    const [state, { recordPrayer }] = useItems()

    if (ids.length === 0) return null

    const type = title.toLowerCase().replace(/ /g, '-')

    const list = ids.map(id => {
        const item = state[id]
        return (
            <li className="RecommendationsList__item" key={`${type}-${id}`}>
                <AppLink
                    className="RecommendationsList__link"
                    to={buildRoute.item(id)}
                >
                    {item.name}
                </AppLink>
                <Button
                    className="RecommendationsList__record-button"
                    onClick={() => recordPrayer(id)}
                >
                    Record prayer
                </Button>
                {/* Include dismiss icon? */}
            </li>
        )
    })

    return (
        <div className="RecommendationsList">
            <IconHeading
                className="RecommendationsList__header"
                icon={icon}
                headingTag="h3"
            >
                {title}
            </IconHeading>
            <ul className="RecommendationsList__list">{list}</ul>
        </div>
    )
}

export default RecommendationsList
