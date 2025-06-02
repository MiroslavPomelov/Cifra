using Auth02_06.Authorization.Entities;
using Auth02_06.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Auth02_06.Controllers
{
    public class DocumentController : Controller
    {
        private readonly IAuthorizationService _authorizationService;
        private readonly DocumentService _documentService;

        public DocumentController(IAuthorizationService authorizationService)
        {
            _authorizationService = authorizationService;
            _documentService = new DocumentService();
        }

        [Authorize(Policy = "CanEditDocument")]
        public IActionResult EditDocument(int id)
        {
            Document doc = _documentService.GetDocumentById(id);
            Task<AuthorizationResult> authResult = _authorizationService.AuthorizeAsync(User, doc, "CanEditDocument");

            if (authResult.Result.Succeeded)
            {
                return View(doc);
            }

            return Forbid();
        }
    }
}
