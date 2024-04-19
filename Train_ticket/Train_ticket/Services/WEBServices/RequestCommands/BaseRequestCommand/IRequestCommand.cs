using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Train_ticket.Services.WEBServices.RequestCommands.BaseRequestCommand
{
    internal interface IRequestCommand
    {
        public Task<string> Request(string content = "");
    }
}
