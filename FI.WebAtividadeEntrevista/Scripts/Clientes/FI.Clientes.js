jQuery.validator.addMethod("CPF", function (value, element) {
    value = jQuery.trim(value);

    value = value.replace('.', '');
    value = value.replace('.', '');
    cpf = value.replace('-', '');
    while (cpf.length < 11) cpf = "0" + cpf;
    var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
    var a = [];
    var b = new Number;
    var c = 11;
    for (i = 0; i < 11; i++) {
        a[i] = cpf.charAt(i);
        if (i < 9) b += (a[i] * --c);
    }
    if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11 - x }
    b = 0;
    c = 11;
    for (y = 0; y < 10; y++) b += (a[y] * c--);
    if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11 - x; }

    var retorno = true;
    if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) retorno = false;

    return this.optional(element) || retorno;

}, "Informe um CPF válido");



$(document).ready(function () {


    let usuarios = [];
    let editIndex = -1; 

    $('#CPF').mask('000.000.000-00');
    $('#BCPF').mask('000.000.000-00');

     var validate = $('#formCadastro').validate({
        rules: {
            CPF: { CPF: true, required: true },
            BCPF: { CPF: true, required: true }
        },
        messages: {
            
        },
    });

    $('#formCadastro').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val(),
                "CPF": $(this).find("#CPF").val(),
                "Beneficiarios": usuarios

            },
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    ModalDialog(r.Result, r.Message)
                    if ("Cadastrado com Sucesso" == r.Result) {
                        $("#formCadastro")[0].reset();
                    }
                }
        });
    });

    

    function renderLista() {
        $('#listaUsuarios').empty();
        usuarios.forEach((usuario, index) => {
            $('#listaUsuarios').append(`
                        <tr>
                            <td class="col-md-3">${usuario.cpf}</td>
                            <td class="col-md-6">${usuario.nome}</td>
                            <td class="col-md-3">
                               <button class="btn btn-sm btn-primary" onclick="editarUsuario(${index})">Alterar</button>
                               <button class="btn btn-sm btn-primary" onclick="removerUsuario(${index})">Excluir</button>
                            </td>
                        </tr>
                    `);
        });
    }

    $('#incluirBeneficiarios').click(function () {
        const nome = $('#BNome').val();
        const cpf = $('#BCPF').val();

        if (!$("#BCPF").valid() || !$("#BNome").valid()){
            
            return;
        }
        if (usuarios.some(user => user.cpf === cpf) ) {
            alert('Dependente com este CPF já foi adicionado.');
            return;
        }


        if (editIndex === -1) {
            usuarios.push({ nome, cpf });
        } else {
            usuarios[editIndex] = { nome, cpf };
            editIndex = -1;
        }

        $('#BNome').val('');
        $('#BCPF').val('');
        renderLista();
    });

    window.editarUsuario = function (index) {
        const usuario = usuarios[index];
        $('#BNome').val(usuario.nome);
        $('#BCPF').val(usuario.cpf);
        editIndex = index;
        $('#cadastroModal').modal('show');
    }

    window.removerUsuario = function (index) {
        usuarios.splice(index, 1);
        renderLista();
    }

})

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}


