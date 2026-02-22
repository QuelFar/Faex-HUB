import { useMemo, useState, type FormEvent } from "react";
import Stepper from "../Stepper/Stepper"; // seu stepper
import {
  BackLink,
  SubmitButton,
  FormRow,
  FieldGroup,
  FieldLabel,
  StyledInput,
  StyledSelect,
  StyledTextarea,
  RadioGroup,
  RadioOption,
  InputWithAdornment,
  AdornmentButton,
  ErrorText,
} from "./Input.style";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

type FieldType =
  | "text"
  | "email"
  | "tel"
  | "date"
  | "password"
  | "radio"
  | "select"
  | "textarea";

type Option = { label: string; value: string };

type FieldBase = {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  flex?: number;
  minLength?: number;
  maxLength?: number;
};

type RadioField = FieldBase & { type: "radio"; options: Option[]; name?: string };
type SelectField = FieldBase & { type: "select"; options: Option[] };

type Field = FieldBase | RadioField | SelectField;
type Row = { fields: Field[] };

type StepConfig = {
  step: number;
  title: string;
  rows: Row[];
};

type FormState = Record<string, string>;

const ESTADOS_BR = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB",
  "PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
];

export default function CadastroWizard() {
  const navigate = useNavigate();

  // ====== CONFIG DOS STEPS ======
  const stepsConfig: StepConfig[] = useMemo(
    () => [
      {
        step: 1,
        title: "Cadastro",
        rows: [
          {
            fields: [
              {
                key: "nome",
                label: "Nome do Aluno",
                type: "text",
                placeholder: "Digite o nome do aluno",
                required: true,
              },
            ],
          },
          {
            fields: [
              {
                key: "sexo",
                label: "Sexo",
                type: "radio",
                required: true,
                options: [
                  { label: "Masculino", value: "masculino" },
                  { label: "Feminino", value: "feminino" },
                ],
              },
              {
                key: "dataNascimento",
                label: "Data de nascimento",
                type: "date",
                required: true,
              },
            ],
          },
          {
            fields: [
              {
                key: "telefone",
                label: "Telefone",
                type: "tel",
                placeholder: "(00) 00000-0000",
                required: true,
              },
            ],
          },
          {
            fields: [
              {
                key: "cpf",
                label: "CPF",
                type: "text",
                placeholder: "000.000.000-00",
                required: true,
              },
            ],
          },
          {
            fields: [
              {
                key: "email",
                label: "Email",
                type: "email",
                placeholder: "Digite o email",
                required: true,
              },
            ],
          },
          {
            fields: [
              {
                key: "senha",
                label: "Senha",
                type: "password",
                placeholder: "Digite sua senha",
                required: true,
                minLength: 6,
              },
            ],
          },
          {
            fields: [
              {
                key: "confirmarSenha",
                label: "Confirmar Senha",
                type: "password",
                placeholder: "Confirme sua senha",
                required: true,
                minLength: 6,
              },
            ],
          },
        ],
      },
      {
        step: 2,
        title: "Endereço",
        rows: [
          {
            fields: [
              {
                key: "cep",
                label: "CEP",
                type: "text",
                placeholder: "Digite seu CEP",
                required: true,
              },
            ],
          },
          {
            fields: [
              {
                key: "bairro",
                label: "Bairro",
                type: "text",
                placeholder: "Digite seu Bairro",
                required: true,
                flex: 2,
              },
              {
                key: "numero",
                label: "Número",
                type: "text",
                placeholder: "Número",
                required: true,
                flex: 1,
              },
            ],
          },
          {
            fields: [
              {
                key: "cidade",
                label: "Cidade",
                type: "select",
                required: true,
                flex: 2,
                placeholder: "Selecionar...",
                options: [
                  { label: "Lavras", value: "Lavras" },
                  { label: "Belo Horizonte", value: "Belo Horizonte" },
                  { label: "São Paulo", value: "São Paulo" },
                  { label: "Rio de Janeiro", value: "Rio de Janeiro" },
                ],
              },
              {
                key: "uf",
                label: "UF",
                type: "select",
                required: true,
                flex: 1,
                placeholder: "Selecionar...",
                options: ESTADOS_BR.map((uf) => ({ label: uf, value: uf })),
              },
            ],
          },
          {
            fields: [
              {
                key: "endereco",
                label: "Endereço",
                type: "text",
                placeholder: "Digite seu Endereço",
                required: true,
              },
            ],
          },
          {
            fields: [
              {
                key: "complemento",
                label: "Complemento",
                type: "textarea",
                placeholder: "Ex: Ao lado da Escola Rivadavia",
                required: false,
              },
            ],
          },
        ],
      },
    ],
    []
  );

  const totalSteps = stepsConfig.length;

  // ====== STATE ======
  const [stepActive, setStepActive] = useState(1);

  const initialForm: FormState = useMemo(() => {
    const acc: FormState = {};
    stepsConfig.forEach((s) =>
      s.rows.forEach((r) =>
        r.fields.forEach((f) => {
          if (f.type === "radio") {
            const rf = f as RadioField;
            acc[f.key] = rf.options[0]?.value ?? "";
          } else {
            acc[f.key] = "";
          }
        })
      )
    );
    return acc;
  }, [stepsConfig]);

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({
    senha: false,
    confirmarSenha: false,
  });

  const currentStepConfig = stepsConfig.find((s) => s.step === stepActive)!;

  const setValue = (key: string, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: "" }));
  };

  const togglePassword = (key: string) =>
    setShowPassword((p) => ({ ...p, [key]: !p[key] }));

  // ====== VALIDAÇÃO POR STEP ======
  const validateStep = (step: number): boolean => {
    const cfg = stepsConfig.find((s) => s.step === step);
    if (!cfg) return true;

    const nextErrors: Record<string, string> = {};

    cfg.rows.forEach((row) => {
      row.fields.forEach((f) => {
        const v = (form[f.key] ?? "").trim();

        if (f.required && !v) nextErrors[f.key] = "Campo obrigatório.";
        if (f.minLength && v && v.length < f.minLength)
          nextErrors[f.key] = `Mínimo de ${f.minLength} caracteres.`;
      });
    });

    // regra extra: confirmar senha só no step 1
    if (step === 1) {
      if (form.senha && form.confirmarSenha && form.senha !== form.confirmarSenha) {
        nextErrors.confirmarSenha = "As senhas não conferem.";
      }
    }

    setErrors((prev) => ({ ...prev, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  };

  // ====== NAVEGAÇÃO ENTRE STEPS ======
  const next = () => {
    if (!validateStep(stepActive)) return;
    setStepActive((s) => Math.min(s + 1, totalSteps));
  };

  const back = () => setStepActive((s) => Math.max(s - 1, 1));

  // PULAR STEP (clique no stepper)
  // regra: pode voltar livre; pra avançar, exige validação do step atual
  const goToStep = (target: number) => {
    const safe = Math.min(Math.max(target, 1), totalSteps);
    if (safe <= stepActive) {
      setStepActive(safe);
      return;
    }
    // indo pra frente: valida o step atual (ou você pode validar todos até target)
    if (validateStep(stepActive)) setStepActive(safe);
  };

  // ====== SUBMIT FINAL (no step 2) ======
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (stepActive < totalSteps) {
      next();
      return;
    }

    // step final: valida step 2 antes de finalizar
    if (!validateStep(stepActive)) return;

    // aqui você tem TODOS os dados: step1 + step2
    // console.log("FINAL FORM:", form);

    // finalize: chamar API, etc.
  };

  const renderField = (f: Field) => {
    const value = form[f.key] ?? "";
    const error = errors[f.key];

    if (f.type === "radio") {
      const rf = f as RadioField;
      return (
        <FieldGroup key={f.key} $flex={f.flex}>
          <FieldLabel>{f.label}</FieldLabel>
          <RadioGroup>
            {rf.options.map((opt) => (
              <RadioOption key={opt.value}>
                <input
                  type="radio"
                  name={rf.name ?? f.key}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={(e) => setValue(f.key, e.target.value)}
                  required={f.required}
                />
                {opt.label}
              </RadioOption>
            ))}
          </RadioGroup>
          {error && <ErrorText>{error}</ErrorText>}
        </FieldGroup>
      );
    }

    if (f.type === "select") {
      const sf = f as SelectField;
      return (
        <FieldGroup key={f.key} $flex={f.flex}>
          <FieldLabel htmlFor={f.key}>{f.label}</FieldLabel>
          <StyledSelect
            id={f.key}
            value={value}
            onChange={(e) => setValue(f.key, e.target.value)}
            required={f.required}
            aria-invalid={!!error}
          >
            <option value="" disabled>
              {f.placeholder ?? "Selecionar..."}
            </option>
            {sf.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </StyledSelect>
          {error && <ErrorText>{error}</ErrorText>}
        </FieldGroup>
      );
    }

    if (f.type === "textarea") {
      return (
        <FieldGroup key={f.key} $flex={f.flex}>
          <FieldLabel htmlFor={f.key}>{f.label}</FieldLabel>
          <StyledTextarea
            id={f.key}
            value={value}
            onChange={(e) => setValue(f.key, e.target.value)}
            placeholder={f.placeholder}
            required={f.required}
            aria-invalid={!!error}
          />
          {error && <ErrorText>{error}</ErrorText>}
        </FieldGroup>
      );
    }

    if (f.type === "password") {
      const visible = !!showPassword[f.key];
      return (
        <FieldGroup key={f.key} $flex={f.flex}>
          <FieldLabel htmlFor={f.key}>{f.label}</FieldLabel>
          <InputWithAdornment>
            <StyledInput
              id={f.key}
              type={visible ? "text" : "password"}
              value={value}
              onChange={(e) => setValue(f.key, e.target.value)}
              placeholder={f.placeholder}
              required={f.required}
              minLength={f.minLength}
              maxLength={f.maxLength}
              aria-invalid={!!error}
            />
            <AdornmentButton
              type="button"
              onClick={() => togglePassword(f.key)}
              aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
            >
              {visible ? <VisibilityOff /> : <Visibility />}
            </AdornmentButton>
          </InputWithAdornment>
          {error && <ErrorText>{error}</ErrorText>}
        </FieldGroup>
      );
    }

    return (
      <FieldGroup key={f.key} $flex={f.flex}>
        <FieldLabel htmlFor={f.key}>{f.label}</FieldLabel>
        <StyledInput
          id={f.key}
          type={f.type}
          value={value}
          onChange={(e) => setValue(f.key, e.target.value)}
          placeholder={f.placeholder}
          required={f.required}
          minLength={f.minLength}
          maxLength={f.maxLength}
          aria-invalid={!!error}
        />
        {error && <ErrorText>{error}</ErrorText>}
      </FieldGroup>
    );
  };

  return (
    <>
      {/* Stepper clicável (para pular) */}
      <Stepper stepActive={stepActive} onStepClick={goToStep} />

      <form onSubmit={handleSubmit}>
        {currentStepConfig.rows.map((row, idx) =>
          row.fields.length > 1 ? (
            <FormRow key={idx}>{row.fields.map(renderField)}</FormRow>
          ) : (
            <div key={idx}>{row.fields.map(renderField)}</div>
          )
        )}

        <SubmitButton type="submit">
          {stepActive < totalSteps ? "Avançar" : "Finalizar"}
        </SubmitButton>

        {/* botão voltar entre steps (opcional) */}
        {stepActive > 1 && (
          <BackLink type="button" onClick={back}>
            Voltar
          </BackLink>
        )}

        <BackLink type="button" onClick={() => navigate("/login")}>
          Já tem uma conta? Entrar
        </BackLink>
      </form>
    </>
  );
}