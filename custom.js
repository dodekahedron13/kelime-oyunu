$(function ($) {

    window.sayac = 1;
    $('#ans').on('input keyup', function(event) {
        if ( event.which == 13 ) {         
            let dd = $('#dd');
            let ff = $('#ff');
            let durum = false;
            if ( window.arr[sayac - 1] == this.value ) { // && this.value
                $(`#${sayac}`).removeClass().addClass('text-success');
                dd.text(parseInt(dd.text())+1);
                durum = true;
            } else {
                $(`#${sayac}`).removeClass().addClass('text-danger');
                ff.text(parseInt(ff.text())+1);             
                durum = false;
            }

            $('#ansDIV').append(`
            <span class="font-weight-bold 
                ${durum == true 
                    ? 'text-success' 
                    : 'text-danger'}">
                    ${this.value},
            </span>`);      

            window.sayac++;
            this.value = "";
            if ((window.sayac-1)==window.arr.length) {
                $(this).prop('disabled', true);
                this.value = "";
                $('#restartDIV').prop('hidden', false);
                return 0;
            }
            return 0;
        }
    });

    $('#restartDIV').click( function () {
        $(this).prop('hidden', true);
        return restart();
    });

    const strCreate = () => {
        let x = Number(prompt('Kaç Kelimelik Soru Dizi Oluşturulsun ?')) ?? null;
        x = x ? x : null;
        if ( !x ) {
            return strCreate();
        }
        x != Number(x) ? strCreate() : x;

        let y = Number(prompt('Kelimeler Max. Kaç Harften Oluşturulsun ?')) ?? null;
        y = y ? y : null;
        if ( !y ) {
            return strCreate();
        }
        y != Number(y) ? strCreate() : y;
        
        window.arr = [];

        $('#arr').addClass('p-2');        
        for( let i = 1; i <= x; i++ ) {
            let rad = Math.floor((Math.random() * y ) + 3);
            let randChar = randomChar(rad);            
            $('#arr').append(`
            <span id="${i}" 
                  class="text-dark">
                  ${ i==x 
                    ? randChar
                    : randChar + ',' }
            </span>`);
            window.arr.push(randChar);
        }
    }

    const randomChar = (ln) => {
        let chars = 'abcdefghijklmnopqrstuvwxyz';
        let str = '';

        for (let i = 0; i < ln; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        } 

        return str;
    }

    const restart = () => {
        window.arr = [];
        window.sayac = 1;

        $('#createDIV').css('display', 'block');
        $('#create').css('display', 'block');
        $('#ans').prop('disabled', true);
        $('#info').prop('hidden', true);               
        $('#ansDIV').html('');
        $('#arr').html('');
        $('#arr').html(`
        <div class="text-center p-3" 
             id="createDIV">
             <button class="btn btn-sm btn-dark font-weight-bold" 
                     id="create">Kelime Dizisi Oluştur
             </button>
        </div>`);
        $('#ans').prop('disabled', false);
        $('#dd').text('0');
        $('#ff').text('0');
        return 0;
    }

    $(document).on('click', '#create', function () {
        $('#createDIV').css('display', 'none');
        $(this).css('display', 'none');
        $('#ans').prop('disabled', false);
        $('#info').prop('hidden', false);
        $('#ans').focus();

        return strCreate();
    });

    $('#tt').on('change', function() { // Süre dolduğunda restart() çağır.
    	// ...
    });
});
