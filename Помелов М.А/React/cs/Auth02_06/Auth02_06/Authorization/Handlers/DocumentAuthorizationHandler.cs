using Auth02_06.Authorization.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace Auth02_06.Authorization.Handlers
{
    public class DocumentAuthorizationHandler : AuthorizationHandler<OperationAuthorizationRequirement, Document>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, OperationAuthorizationRequirement requirement, Document resource)
        {
            if (requirement.Name == "Edit" && resource.AuthorId == context?.User?.Identity?.Name)
            {
                context.Succeed(requirement);
            }
            return Task.CompletedTask;
        }


    }
}
