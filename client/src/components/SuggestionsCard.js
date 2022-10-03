import React from 'react'
import { useState } from 'react'
import './Suggestions.css'

function SuggestionsCard({suggestion}) {

    const [followClicked, setFollowClicked] = useState(false)

    function handleFollowClick() {
        fetch('http://127.0.0.1:3000/follows', {
            method: 'POST',
            headers: {
                token: sessionStorage.getItem('jwt'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({followed_user_id: suggestion.id})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setFollowClicked(true)
          })
    }
  return (
    <div className='each-suggestion'>
        <div className='image-name-p'>

        <img src={suggestion.profile_image} />
        <div>
        <p className='suggestion-username'>{suggestion.name}&nbsp;</p>
        <p className='suggestion-for-you'>Suggested for you</p>
        </div>
        </div>
        {!followClicked ? <button onClick={handleFollowClick} className='follow-btn'>Follow</button> : <button className='followed-btn'>Following</button>}
    </div>
  )
}

export default SuggestionsCard;
