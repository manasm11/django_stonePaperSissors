var stone_url, paper_url, scissor_url
var is_paused = false
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
    let animationSpeed = 80
    // $("#computer").fadeToggle(1000,
    //     () => animateComputer())
    console.log('inside setImageUrls');
    let computer = $('#computer');
    computer.fadeOut(animationSpeed, function () {
        console.log("*Changing url");
        switch (computer.attr('src')) {
            case stone_url:
                computer.attr('src', paper_url);
                console.log(computer.attr('src'));
                break;
            case paper_url:
                computer.attr('src', scissor_url);
                console.log(computer.attr('src'));
                break;
            default:
                computer.attr('src', stone_url);
                console.log(computer.attr('src'));
                break;
        }
        computer.fadeIn(animationSpeed, () => { animateComputer() })

    })
    console.log('leaving setImageUrls');
}

function applyOnClickListenersToChoices() {
    let delayTime = 2000;
    $('.choice').on('click', function () {
        if (is_paused) return;
        let prev_color = $(this).css('--box-shadow-color')
        setBoxColor(this)
        $('#computer').stop()
        $('#computer').css('opacity', '1');
        is_paused = true
        setTimeout(() => {
            animateComputer()
            $(this).css('--box-shadow-color', prev_color)
            is_paused = false
        }, delayTime);
    });
}
function setBoxColor(choice) {
    if ($(choice).attr('src') == $('#computer').attr('src'))
        $(choice).css('--box-shadow-color', 'blue')
    else
        switch ($(choice).attr('src')) {
            case stone_url: {
                if ($('#computer').attr('src') == paper_url)
                    $(choice).css('--box-shadow-color', 'red')
                else
                    $(choice).css('--box-shadow-color', 'greenyellow')
            }
                break;
            case paper_url: {
                if ($('#computer').attr('src') == scissor_url)
                    $(choice).css('--box-shadow-color', 'red')
                else
                    $(choice).css('--box-shadow-color', 'greenyellow')
            }
                break;
            default: {

                if ($('#computer').attr('src') == stone_url)
                    $(choice).css('--box-shadow-color', 'red')
                else
                    $(choice).css('--box-shadow-color', 'greenyellow')
            }
                break;
        }
}