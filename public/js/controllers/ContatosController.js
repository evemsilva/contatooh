angular.module('contatooh').controller('ContatosController',
    function ($scope, $resource, Contato) {

        $scope.filtro = '';
        $scope.mensagem = { texto: '' };

        function buscaContatos() {
            Contato.query(
                function (contatos) {
                    $scope.contatos = contatos;
                },
                function (erro) {
                    $scope.mensagem = {
                        texto: 'Não foi possível obter a lista'
                    };
                    console.log(erro);
                }
            );
        }

        buscaContatos();

        // Remove o contato por id
        // Se o mesmo foi excluido com sucesso, o metodo buscaContatos eh invocado
        $scope.remove = function (contato) {
            Contato.delete({ id: contato._id },
                buscaContatos,
                function (erro) {
                    $scope.mensagem = {
                        texto: 'Não foi possível remover o contato'
                    };
                    console.log(erro);
                }
            );
        };

    });