export const levelsComponent = {
    render() {
        return `
            <ul class="levels">
                <li class="level" data-count="10">
                    <span class="lvl-info" >10 Questions</span>
                    <span class="record" id="record1">${localStorage.getItem('record1') || 0} s. </span>
                </li>
                <li class="level" data-count="20">
                    <span class="lvl-info" >20 Questions</span>
                    <span class="record" id="record1">${localStorage.getItem('record2') || 0} s.</span>
                </li>
                <li class="level" data-count="30">
                    <span class="lvl-info" >30 Questions</span>
                    <span class="record" id="record1">${localStorage.getItem('record3') || 0} s.</span>
                </li>
            </ul>
        `
    }
}


export function renderQuestions(questions) {
    const content = questions.reduce((acc, itm, idx) => {
        return acc += `
            <li class="question" data-index="${idx}">${itm.content}</li>
        `
    }, '')

    return ` <ul class="questions">${content}</ul> `
}


export function renderGameOverDisplay(seconds, penalty) {
    return `
        <div class="game-over">
            <h1>Game Over</h1>
            <p>Your result <span class="result-sec">${seconds}</span> s + penalty <span class="penalty-sec">${penalty}</span> s </p>
            <button class="button true-btn" id="playAgainBtn">Play agein</button>
        </div>
    `
}
