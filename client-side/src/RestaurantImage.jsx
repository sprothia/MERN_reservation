export default function RestaurantImage({restaurant, index=0, className=null}) {
    if(!restaurant.photos) {
        return ''
    }

    if(!className) {
        className = 'object-cover'
    }

    return (
        <img className={className} src={restaurant.photos}/>
    )
}