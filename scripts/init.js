import { skillChallenge } from './scripts.js'

// Set up socket listener to listen for gm_skillset macro
Hooks.once('ready', () => {
  console.log('PF2e RSC | hooked in')
  game.socket.on('module.pf2e-rsc', ({ type, payload }) => {
    if (type === 'playerSkillChallenge') {
      const actor = game.actors.get(payload.actorID)
      if (actor?.testUserPermission(game.user, 'OWNER')) {
        skillChallenge(
          payload.neededSuccesses,
          payload.DC,
          payload.chosenSkill,
          payload.abort,
          payload.actorID,
        )
      }
    }
  })
})
