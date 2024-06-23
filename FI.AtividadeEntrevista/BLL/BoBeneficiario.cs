using FI.AtividadeEntrevista.BLL.UTILS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        /// <summary>
        /// Inclui um novo cliente
        /// </summary>
        /// <param name="cliente">Objeto de cliente</param>
        public long Incluir(DML.Beneficiario beneficiario)
        {
            //validarcpf
            long id = 0;
            DAL.DaoBeneficiario benef = new DAL.DaoBeneficiario();

            beneficiario.CPF = CPFValidator.Validate(beneficiario.CPF);

            if(beneficiario.CPF == "")
            {
                id = -1;
            }
            else 
            { 
                benef.Incluir(beneficiario);
            }
            return id;
        }

       
    }
}
