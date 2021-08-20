const fetch = require("node-fetch")

module.exports = (VoiceChannel, ApplicationID) => {
  return new Promise(res => {
    let fetched = fetch(`https://discord.com/api/v9/channels/${VoiceChannel.id}/invites`, {
      method: 'POST',
      body: JSON.stringify({
        max_age: 86400,
        max_uses: 0,
        target_application_id: ApplicationID,
        target_type: 2,
        temporary: false,
        validate: null
      }),
      headers: {
        "Authorization": `Bot ${VoiceChannel.client.token}`,
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
    res(fetched)
  })
}