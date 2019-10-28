import React from 'react'
import dayjs from 'dayjs'
import ROUTES, { buildRoute } from 'constants/routes'
import { useItems } from 'store/useItems'
import ViewContainer from 'components/ViewContainer/ViewContainer'
import ButtonLink from 'components/ButtonLink/ButtonLink'
import Button from 'components/Button/Button'
import Icon from 'components/Icon/Icon'

function ItemView(props) {
    const [, { get, recordPrayer, toggleFavorite }] = useItems()
    const data = get(props.id)
    function formateSpecialDate() {
        const day = dayjs(data.date).format('M/D')
        return day === 'Invalid Date' ? 'None saved' : day
    }
    function formatLastPrayed() {
        const date = data.prayerRecord[0]
        return date
            ? dayjs(data.prayerRecord[0]).format('M/D/YYYY')
            : 'None recorded'
    }
    return (
        <ViewContainer title={data.name} backTo={ROUTES.list}>
            <header>
                <section>
                    <div>
                        <div>
                            <Icon icon="Clock" />
                            <b>Last prayer</b>
                        </div>
                        <div>{formatLastPrayed()}</div>
                    </div>
                    <div>
                        <div>
                            <Icon icon="Calendar" />
                            <b>Special date</b>
                        </div>
                        <div>{formateSpecialDate()}</div>
                    </div>
                    <Button
                        onClick={() => toggleFavorite(props.id)}
                        aria-label="Toggle favorite"
                        aria-pressed={Boolean(data.favorite)}
                    >
                        <Icon icon="Star" />
                        <span>{data.favorite ? 'Favorited' : 'Favorite'}</span>
                    </Button>
                </section>
            </header>
            <h2>Notes</h2>
            <p
                dangerouslySetInnerHTML={{
                    __html: data.notes.replace(/\n/g, '<br/>')
                }}
            />
            {false && process.env.NODE_ENV === 'development' && (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            )}
            <footer>
                <Button onClick={() => recordPrayer(props.id)}>
                    Record prayer
                </Button>
                <ButtonLink to={buildRoute.edit(props.id)}>Edit</ButtonLink>
            </footer>
        </ViewContainer>
    )
}

export default ItemView
