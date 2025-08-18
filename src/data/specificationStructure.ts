export interface SpecSection {
  id: string;
  title: string;
  children?: SpecSection[];
  required?: boolean;
  type?: string;
  description?: string;
}

export const specificationStructure: SpecSection[] = [
  {
    id: 'root',
    title: 'OpenCLI Document',
    description: 'Root-level properties of an OpenCLI specification',
    children: [
      {
        id: 'opencli',
        title: 'opencli',
        required: true,
        type: 'string',
        description: 'The version of the OpenCLI specification being used',
      },
      {
        id: 'info',
        title: 'info',
        required: true,
        type: 'object',
        description: 'Metadata about the CLI tool',
        children: [
          {
            id: 'info-title',
            title: 'title',
            required: true,
            type: 'string',
            description: 'The title of the CLI application',
          },
          {
            id: 'info-description',
            title: 'description',
            type: 'string',
            description: 'A description of the CLI application',
          },
          {
            id: 'info-version',
            title: 'version',
            required: true,
            type: 'string',
            description: 'The version of the CLI application',
          },
          {
            id: 'info-contact',
            title: 'contact',
            type: 'object',
            description: 'Contact information for the CLI tool',
            children: [
              {
                id: 'contact-name',
                title: 'name',
                type: 'string',
                description: 'The name of the contact person/organization',
              },
              {
                id: 'contact-url',
                title: 'url',
                type: 'string',
                description: 'The URL pointing to the contact information',
              },
              {
                id: 'contact-email',
                title: 'email',
                type: 'string',
                description: 'The email address of the contact person/organization',
              },
            ],
          },
          {
            id: 'info-license',
            title: 'license',
            type: 'object',
            description: 'License information for the CLI tool',
            children: [
              {
                id: 'license-name',
                title: 'name',
                type: 'string',
                description: 'The name of the license',
              },
              {
                id: 'license-url',
                title: 'url',
                type: 'string',
                description: 'A URL to the license used for the CLI tool',
              },
            ],
          },
        ],
      },
      {
        id: 'externalDocs',
        title: 'externalDocs',
        type: 'object',
        description: 'Links to external documentation',
        children: [
          {
            id: 'externaldocs-description',
            title: 'description',
            type: 'string',
            description: 'A description of the external documentation',
          },
          {
            id: 'externaldocs-url',
            title: 'url',
            type: 'string',
            description: 'The URL for the external documentation',
          },
        ],
      },
      {
        id: 'platforms',
        title: 'platforms',
        type: 'array',
        description: 'Supported platforms and architectures',
        children: [
          {
            id: 'platform-name',
            title: 'name',
            type: 'string',
            description: 'Platform name (e.g., linux, darwin, windows)',
          },
          {
            id: 'platform-architectures',
            title: 'architectures',
            type: 'array',
            description: 'Supported architectures for this platform',
          },
        ],
      },
      {
        id: 'environment',
        title: 'environment',
        type: 'array',
        description: 'Environment variables used by the CLI',
        children: [
          {
            id: 'env-name',
            title: 'name',
            type: 'string',
            description: 'Environment variable name',
          },
          {
            id: 'env-description',
            title: 'description',
            type: 'string',
            description: 'Description of the environment variable',
          },
        ],
      },
      {
        id: 'tags',
        title: 'tags',
        type: 'array',
        description: 'Tags for grouping commands',
        children: [
          {
            id: 'tag-name',
            title: 'name',
            type: 'string',
            description: 'Tag name',
          },
          {
            id: 'tag-description',
            title: 'description',
            type: 'string',
            description: 'Tag description',
          },
        ],
      },
      {
        id: 'commands',
        title: 'commands',
        required: true,
        type: 'object',
        description: 'CLI commands and their definitions',
        children: [
          {
            id: 'command-summary',
            title: 'summary',
            type: 'string',
            description: 'A short summary of the command',
          },
          {
            id: 'command-description',
            title: 'description',
            type: 'string',
            description: 'A detailed description of the command',
          },
          {
            id: 'command-operationId',
            title: 'operationId',
            type: 'string',
            description: 'Unique identifier for the command',
          },
          {
            id: 'command-aliases',
            title: 'aliases',
            type: 'array',
            description: 'Alternative names for the command',
          },
          {
            id: 'command-tags',
            title: 'tags',
            type: 'array',
            description: 'Tags associated with the command',
          },
          {
            id: 'command-parameters',
            title: 'parameters',
            type: 'array',
            description: 'Command parameters, flags, and options',
            children: [
              {
                id: 'parameter-name',
                title: 'name',
                type: 'string',
                description: 'Parameter name',
              },
              {
                id: 'parameter-in',
                title: 'in',
                type: 'string',
                description: 'Parameter location (argument, flag, option)',
              },
              {
                id: 'parameter-position',
                title: 'position',
                type: 'integer',
                description: 'Position for positional arguments',
              },
              {
                id: 'parameter-alias',
                title: 'alias',
                type: 'array',
                description: 'Short aliases for the parameter',
              },
              {
                id: 'parameter-description',
                title: 'description',
                type: 'string',
                description: 'Parameter description',
              },
              {
                id: 'parameter-required',
                title: 'required',
                type: 'boolean',
                description: 'Whether parameter is required',
              },
              {
                id: 'parameter-scope',
                title: 'scope',
                type: 'string',
                description: 'Parameter scope (local, inherited)',
              },
              {
                id: 'parameter-arity',
                title: 'arity',
                type: 'object',
                description: 'Number of values this parameter accepts',
              },
              {
                id: 'parameter-schema',
                title: 'schema',
                type: 'object',
                description: 'Parameter value schema',
                children: [
                  {
                    id: 'schema-type',
                    title: 'type',
                    type: 'string',
                    description: 'Data type (string, integer, boolean, etc.)',
                  },
                  {
                    id: 'schema-format',
                    title: 'format',
                    type: 'string',
                    description: 'Format hint (path, email, uri, etc.)',
                  },
                  {
                    id: 'schema-enum',
                    title: 'enum',
                    type: 'array',
                    description: 'List of allowed values',
                  },
                  {
                    id: 'schema-default',
                    title: 'default',
                    type: 'any',
                    description: 'Default value if not provided',
                  },
                  {
                    id: 'schema-example',
                    title: 'example',
                    type: 'any',
                    description: 'Example value for documentation',
                  },
                ],
              },
            ],
          },
          {
            id: 'command-responses',
            title: 'responses',
            type: 'object',
            description: 'Expected command outputs and exit codes',
            children: [
              {
                id: 'response-description',
                title: 'description',
                type: 'string',
                description: 'Response description',
              },
              {
                id: 'response-content',
                title: 'content',
                type: 'object',
                description: 'Response content by media type',
              },
            ],
          },
        ],
      },
      {
        id: 'components',
        title: 'components',
        type: 'object',
        description: 'Reusable components for the specification',
        children: [
          {
            id: 'components-schemas',
            title: 'schemas',
            type: 'object',
            description: 'Reusable data schemas',
          },
          {
            id: 'components-parameters',
            title: 'parameters',
            type: 'object',
            description: 'Reusable parameter definitions',
          },
          {
            id: 'components-responses',
            title: 'responses',
            type: 'object',
            description: 'Reusable response definitions',
          },
        ],
      },
    ],
  },
];

/**
 * Find a section by ID in the specification structure
 */
export function findSectionById(sections: SpecSection[], id: string): SpecSection | null {
  for (const section of sections) {
    if (section.id === id) {
      return section;
    }
    if (section.children) {
      const found = findSectionById(section.children, id);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Get all section IDs from the specification structure
 */
export function getAllSectionIds(sections: SpecSection[]): string[] {
  const ids: string[] = [];

  function collectIds(sections: SpecSection[]) {
    for (const section of sections) {
      ids.push(section.id);
      if (section.children) {
        collectIds(section.children);
      }
    }
  }

  collectIds(sections);
  return ids;
}

/**
 * Get default expanded sections (typically root level and required sections)
 */
export function getDefaultExpandedSections(): string[] {
  return ['root', 'info', 'commands', 'info-contact', 'info-license'];
}
