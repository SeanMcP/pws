import React from 'react'

function ViewContent({ children, ...props }) {
    return (
        <div className="ViewContent" {...props}>
            {children}
        </div>
    )
}

export default ViewContent
