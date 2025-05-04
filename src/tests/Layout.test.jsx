import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";

describe('Layout', () => {
    it('renders the contents of the header footer, and children', () => {
        render(
            <MemoryRouter>
                <Layout>
                    <div>Test page contents</div>
                </Layout>
            </MemoryRouter>
        )

        expect(screen.getByText('Home')).toBeInTheDocument()
        expect(screen.getByText('Book Now')).toBeInTheDocument()

        expect(screen.getByText('Test page contents')).toBeInTheDocument()

        expect(screen.getByText(/© 2025 Behavior Analyst/i)).toBeInTheDocument()
    })
})