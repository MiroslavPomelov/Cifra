using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Train_ticket.Services.WEBServices.RequestCommands.BaseRequestCommand;

namespace Train_ticket.Services.WEBServices
{
    internal class HTTPClient
    {
        private IRequestCommand _requestCommand;

        public HTTPClient(IRequestCommand command)
        {
            _requestCommand = command;
        }

        public async Task<string> GetData()
        {
            return await _requestCommand.Request();
        }      
    }
}
