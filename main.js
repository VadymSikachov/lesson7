
async function get() {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=6a5f0d&s=${$('.input-search')[0].value}`)
        const data = await response.json();
        RenderingSearch(data)
        $('.more-details').on('click', function () {
            getInfo($(this).data('imdb'))

        })
        $('.fon').on('click', function () {
            $('.fon').css({
                backgroundColor: 'rgba(0, 0, 0, 0)',
                zIndex: -10,
                height: $('html').css('height'),
            })
            $('.Movie-details').css({
                zIndex: -30,
                display: 'none'
            })
        })
        return data;
    } catch (err) {
        return console.log(err)
    }
}
async function getInfo(ID) {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=6a5f0d&i=${ID}`)
        const data = await response.json()
        ShowDetails(data)
        return console.log(data)
    } catch (err) {
        return console.log(err)
    }
}
$('.GetData').on('click', function () {
    $('.search-resoult').empty()
    get();
})


function RenderingSearch(Resoult) {
    for (let i = 0; i < Resoult.Search.length; i++) {
        const Div = document.createElement('div');
        Div.className = "resoult";
        Div.dataset.imdb = Resoult.Search[i].imdbID;
        $('.search-resoult')[0].appendChild(Div)
        const DivImg = document.createElement('div');
        DivImg.className = "resoult-image";
        DivImg.style.backgroundImage = `url(${Resoult.Search[i].Poster})`;
        $('.resoult')[i].appendChild(DivImg);
        const DivTitle = document.createElement('div');
        DivTitle.className = "resoult-title info";
        DivTitle.textContent = Resoult.Search[i].Title;
        $('.resoult')[i].appendChild(DivTitle);
        const DivType = document.createElement('div');
        DivType.className = "type info";
        DivType.textContent = Resoult.Search[i].Type;
        $('.resoult')[i].appendChild(DivType);
        const DivYear = document.createElement('div');
        DivYear.className = "year info";
        DivYear.textContent = Resoult.Search[i].Year;
        $('.resoult')[i].appendChild(DivYear);
        const DivDetails = document.createElement('div');
        DivDetails.className = "more-details info";
        DivDetails.textContent = `More Details`;
        DivDetails.dataset.imdb = Resoult.Search[i].imdbID;
        $('.resoult')[i].appendChild(DivDetails);
        $('.resoult').fadeIn(300);
    }
}

function ShowDetails(detail) {
    $('.fon').css({
        backgroundColor: 'rgba(0, 0, 0, 0.842)',
        zIndex: 10,
        height: $('html').css('height'),
    })
    $('.Movie-details').css({
        zIndex: 30,
        display: 'grid',
        top: `${scrollY + 350}px`
    })
    $('.movie-image').css({
        backgroundImage: `url(${detail.Poster})`
    })
    $('h2').text(`${detail.Title}`)
    $('.rated').text(`${detail.Rated} ${detail.Year} ${detail.Genre}`);
    $('.short-discroption').text(`${detail.Plot}`)
    $('.writen-by').html(`<span>Writen by : </span>${detail.Writer}`)
    $('.directered-by').html(`<span>Directered by : </span>${detail.Director}`)
    $('.starring').html(`<span>Starring : </span>${detail.Actors}`)
    $('.box-office').html(`<span>BoxOffice : </span>${detail.BoxOffice}`)
    $('.awards').html(`<span>Awards : </span>${detail.Awards}`)
    $('.ratings').html(`<span>Ratings : </span><br>${detail.Ratings[0].Source}  ${detail.Ratings[0].Value}
    <br>${detail.Ratings[1].Source}  ${detail.Ratings[1].Value}
    <br>${detail.Ratings[2].Source}  ${detail.Ratings[2].Value}`)
}
