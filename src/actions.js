export const NEW_STEP = 'NEW_STEP';
export const REVERT_TO_STEP = 'REVERT_TO_STEP';

function newAction(type, ...args) {
  return Object.assign({ type }, ...args);
}

export function newStep(player, square) {
  return newAction(NEW_STEP, { player, square });
}

export function revertToStep(stepNumber) {
  return newAction(REVERT_TO_STEP, { stepNumber });
}
