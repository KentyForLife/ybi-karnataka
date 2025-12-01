import React, { createContext, useState } from 'react'

// AdminContext stores the admin state (0 = not admin, 1 = admin enabled)
export const AdminContext = createContext({ admin: 0, setAdmin: () => {} })

// AdminProvider component wraps the app and provides admin state to all children
export function AdminProvider({ children }) {
	// admin state: 0 (default) = not authenticated, 1 = authenticated as admin
	const [admin, setAdmin] = useState(0)
	return (
		<AdminContext.Provider value={{ admin, setAdmin }}>
			{children}
		</AdminContext.Provider>
	)
}