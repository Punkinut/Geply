import React from 'react'
import Auth from '../../utils/auth';

function MobileNav() {
    if (Auth.loggedIn()) {
        return (
            <>
                <p>NAV</p>
            </>
        )
    }
    return <></>
}

export default MobileNav
