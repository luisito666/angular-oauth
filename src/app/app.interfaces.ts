
export interface TokenResponse {
    access_token: string
    expires_in: number
    id_token: string
    scope: string
    token_type: string
}

export interface IDToken {
    given_name: string
    family_name: string
    nickname: string
    name: string
    picture: string
    locale: string
    updated_at: string
    email: string
    email_verified: boolean
    iss: string
    aud: string
    iat: number
    exp: number
    sub: string
    sid: string
}
