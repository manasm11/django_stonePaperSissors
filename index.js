var stone_url, paper_url, scissor_url
var is_paused = false
var animationSpeed = 360, change_rate = 3
var computer_score = 0, player_score = 0
var color_computer_wins = 'red', color_player_wins = 'greenyellow', color_draw = 'blue'
$(function () {
    [stone_url, paper_url, scissor_url] = getUrls()
    applyOnClickListenersToChoices()
    console.log("inside main");
    setImageUrls();
    animateComputer();
    console.log("leaving main");
})

function getUrls() {
    console.log("inside getUrls");
    console.log("leaving getUrls");
    return [
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.97DkCjPcQk7gkd38KE8p6QHaEY%26pid%3DApi&f=1',
        'https://i.ytimg.com/vi/CuxIzGPk648/maxresdefault.jpg',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP._b0GW4qwD2MuxziTAI5S4AHaDt%26pid%3DApi&f=1'
    ]
}

function setImageUrls() {
    console.log('inside setImageUrls');
    $('#computer').attr('src', stone_url);
    $('#stone').attr('src', stone_url);
    $('#paper').attr('src', paper_url);
    $('#scissor').attr('src', scissor_url);
    console.log('leaving setImageUrls');
}

function animateComputer() {
    // $("#computer").fadeToggle(1000,
    //     () => animateComputer())
    console.log('inside setImageUrls');
    let computer = $('#computer');
    $("#computer").fadeOut(animationSpeed, function () {
        console.log("*Changing url");
        changeComputerSrc()
        $("#computer").fadeIn(animationSpeed, () => { animateComputer() })

    })
    console.log('leaving setImageUrls');
}

function changeComputerSrc() {
    switch (srcOf("#computer")) {
        case stone_url:
            setComputerSrcTo(paper_url)
            break
        case paper_url:
            setComputerSrcTo(scissor_url)
            break
        default:
            setComputerSrcTo(stone_url)
            break
    }
}

function setComputerSrcTo(src_url) {
    $('#computer').attr('src', src_url)
}

function applyOnClickListenersToChoices() {
    let delayTime = 2000;
    $('.choice').on('click', function () {
        if (is_paused) return;
        let prev_color = $(this).css('--box-shadow-color')
        setBoxColor(this)
        pauseAnimation()
        delayAndResume(this, prev_color, delayTime)
    });
}

function delayAndResume(choice, prev_color, delayTime) {
    setTimeout(() => {
        updateScore()
        resumeAnimation(choice, prev_color)
    }, delayTime)
}

function resumeAnimation(choice, prev_color) {
    animateComputer()
    setChoiceShadowColor(choice, prev_color)
    is_paused = false
}

function pauseAnimation() {
    $('#computer').stop()
    $('#computer').css('opacity', '1')
    is_paused = true
}

function setBoxColor(choice) {
    if (isComputerSrc(srcOf(choice)))
        setChoiceShadowColor(choice, color_draw)
    else
        switch (srcOf(choice)) {
            case stone_url:
                isComputerSrc(paper_url) ? ++computer_score && (animationSpeed += animationSpeed / change_rate) && setChoiceShadowColor(choice, color_computer_wins) : ++player_score && (animationSpeed -= animationSpeed / change_rate) && setChoiceShadowColor(choice, color_player_wins)
                break;
            case paper_url:
                isComputerSrc(scissor_url) ? ++computer_score && (animationSpeed += animationSpeed / change_rate) && setChoiceShadowColor(choice, color_computer_wins) : ++player_score && (animationSpeed -= animationSpeed / change_rate) && setChoiceShadowColor(choice, color_player_wins)
                break;
            default: {
                isComputerSrc(stone_url) ? ++computer_score && (animationSpeed += animationSpeed / change_rate) && setChoiceShadowColor(choice, color_computer_wins) : ++player_score && (animationSpeed -= animationSpeed / change_rate) && setChoiceShadowColor(choice, color_player_wins)
                break;
            }
        }
}
function isComputerSrc(test_src) {
    return srcOf('#computer') == test_src
}

function setChoiceShadowColor(choice, prev_color) {
    $(choice).css('--box-shadow-color', prev_color)
}
function srcOf(query) {
    return $(query).attr('src')
}

function updateScore() {  
    $('.score.computer.points').text(computer_score);
    $('.score.player.points').text(player_score);
}