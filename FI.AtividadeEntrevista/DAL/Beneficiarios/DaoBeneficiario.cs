using FI.AtividadeEntrevista.DML;
using System.Collections.Generic;
using System.Data;
using System.Linq;


namespace FI.AtividadeEntrevista.DAL
{
    internal class DaoBeneficiario : AcessoDados
    {
        internal void Incluir(DML.Beneficiario Beneficiario)
        {

            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("Nome", Beneficiario.Nome));
            parametros.Add(new System.Data.SqlClient.SqlParameter("CPF", Beneficiario.CPF));
            parametros.Add(new System.Data.SqlClient.SqlParameter("IdCliente", Beneficiario.idCliente));

            base.Executar("FI_SP_IncBenef", parametros);
           
        }

    }
}
